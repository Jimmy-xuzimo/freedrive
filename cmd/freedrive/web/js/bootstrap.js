// Resolve the site language before scripts construct their translated labels.
// Every form is handled by script. Block native submission so an Enter press
// before the handlers attach cannot send form fields to the page URL as a GET query.
document.addEventListener('submit', (event) => event.preventDefault(), true);

(async () => {
    await I18n.init();
    const scripts = ['crypto', 'crypto_sync', 'api', 'components', 'auth', 'upload', 'filemanager', 'sidebar-tree', 'admin_panel', 'app'];
    for (const name of scripts) {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `/js/${name}.js`;
            script.async = false;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load /js/${name}.js`));
            document.body.appendChild(script);
        });
    }
    App.init();
})().catch((error) => {
    console.error('FreeDrive startup failed', error);
    const message = document.createElement('p');
    message.textContent = I18n.t('Startup failed. Reload this page to try again.');
    message.setAttribute('role', 'alert');
    document.body.prepend(message);
});
