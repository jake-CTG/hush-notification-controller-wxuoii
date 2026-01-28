
// Web fallback - AdMob is not supported on web
export async function initializeAdMob() {
  console.log('AdMob is not supported on web - skipping initialization');
  return false;
}
