
const { withAndroidManifest } = require('@expo/config-plugins');

const withInstalledAppsPermissions = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    // Add QUERY_ALL_PACKAGES permission for Android 11+
    if (!androidManifest['uses-permission']) {
      androidManifest['uses-permission'] = [];
    }

    const permissions = [
      'android.permission.QUERY_ALL_PACKAGES',
    ];

    permissions.forEach((permission) => {
      if (
        !androidManifest['uses-permission'].find(
          (item) => item.$['android:name'] === permission
        )
      ) {
        androidManifest['uses-permission'].push({
          $: {
            'android:name': permission,
          },
        });
      }
    });

    return config;
  });
};

module.exports = withInstalledAppsPermissions;
