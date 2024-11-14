const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function withGoogleMapsApiKey(config) {
    return withAndroidManifest(config, async (config) => {
        let androidManifest = config.modResults;

        // Add the Google Maps API key meta-data
        const mainApplication = androidManifest.manifest.application[0];

        mainApplication['meta-data'] = mainApplication['meta-data'] || [];
        mainApplication['meta-data'].push({
            $: {
                'android:name': 'com.google.android.geo.API_KEY',
                'android:value': process.env.GOOGLE_MAPS_API_KEY,
            },
        });

        return config;
    });
}; 