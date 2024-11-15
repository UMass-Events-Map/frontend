FROM beevelop/android-nodejs:v2023.10.1

FROM --platform=$BUILDPLATFORM debian:stable-slim AS bun-installer
ARG BUILDPLATFORM
ARG BUN_VERSION=1.1.34

WORKDIR /tmp/
RUN apt-get update && apt-get install -y wget unzip
RUN case ${BUILDPLATFORM} in \
    "linux/amd64")   PLATFORM="linux";  BUN_ARCH=x64     ;; \
    "linux/arm64")   PLATFORM="linux";  BUN_ARCH=aarch64 ;; \
    "darwin/amd64")  PLATFORM="darwin"; BUN_ARCH=x64     ;; \
    "darwin/arm64")  PLATFORM="darwin"; BUN_ARCH=aarch64 ;; \
    "windows/amd64") PLATFORM="windows"; BUN_ARCH=x64    ;; \
    *)              echo "Unsupported platform: ${BUILDPLATFORM}" && exit 1 ;; \
    esac \
    && wget -q https://github.com/oven-sh/bun/releases/download/bun-v${BUN_VERSION}/bun-${PLATFORM}-${BUN_ARCH}.zip \
    && unzip bun-${PLATFORM}-${BUN_ARCH}.zip \
    && mv ./bun-${PLATFORM}-${BUN_ARCH}/bun* /tmp/bun

FROM beevelop/android-nodejs:v2023.10.1

# Update default Java (from base image)
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    && update-java-alternatives -s java-1.17.0-openjdk-amd64 \
    && rm -rf /var/lib/apt/lists/*

# Copy Bun from installer stage and setup environment
COPY --from=bun-installer /tmp/bun /usr/local/bin/
RUN chmod +x /usr/local/bin/bun \
    && ln -s /usr/local/bin/bun /usr/local/bin/bunx

ENV PATH=/usr/local/bin:$PATH \
    JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 \
    ANDROID_HOME=/opt/android \
    PATH=$JAVA_HOME/bin:$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools \
    BUN_INSTALL=/usr/local/bin

# license and NDK installation
RUN mkdir -p ${ANDROID_HOME}/licenses \
    && echo "24333f8a63b6825ea9c5514f83c2829b004d1fee" > ${ANDROID_HOME}/licenses/android-sdk-license \
    && echo "84831b9409646a918e30573bab4c9c91346d8abd" > ${ANDROID_HOME}/licenses/android-sdk-preview-license \
    && yes | sdkmanager --install "ndk;26.1.10909125" "cmake;3.22.1"

WORKDIR /app

COPY package*.json app.json eas.json babel.config.js tsconfig.json android.config.js .env ./

RUN bun add -g expo-cli eas-cli && bun install

COPY . .

RUN bunx expo prebuild --platform android --clean \
    && mv ./umaps-key.keystore ./android/app/umaps-key.keystore \
    && echo ' \n\
    android { \n\
    signingConfigs { \n\
    release { \n\
    storeFile file("umaps-key.keystore") \n\
    storePassword System.getenv("KEYSTORE_PASSWORD") \n\
    keyAlias "umaps" \n\
    keyPassword System.getenv("KEY_PASSWORD") \n\
    } \n\
    } \n\
    buildTypes { \n\
    release { \n\
    signingConfig signingConfigs.release \n\
    } \n\
    } \n\
    }' >> android/app/build.gradle

RUN mkdir -p /output

# Add build args for version info
ARG APP_VERSION
ARG COMMIT_HASH
ARG BRANCH_NAME
ARG APP_NAME

# Convert ARGs to ENVs so they persist at runtime
ENV APP_VERSION=$APP_VERSION
ENV COMMIT_HASH=$COMMIT_HASH
ENV BRANCH_NAME=$BRANCH_NAME
ENV APP_NAME=$APP_NAME

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["cd android && \
    export KEYSTORE_PASSWORD=$(echo \"$KEYSTORE_PASSWORD\" | tr -d '\r') && \
    export KEY_PASSWORD=$(echo \"$KEY_PASSWORD\" | tr -d '\r') && \
    export APP_VERSION=$(echo \"$APP_VERSION\" | tr -d '\r') && \
    export COMMIT_HASH=$(echo \"$COMMIT_HASH\" | tr -d '\r') && \
    export BRANCH_NAME=$(echo \"$BRANCH_NAME\" | tr -d '\r') && \
    export APP_NAME=$(echo \"$APP_NAME\" | tr -d '\r') && \
    ./gradlew assembleRelease && \
    cp app/build/outputs/apk/release/app-release.apk \"/output/${APP_NAME}-v${APP_VERSION}-${BRANCH_NAME}-${COMMIT_HASH}.apk\""]