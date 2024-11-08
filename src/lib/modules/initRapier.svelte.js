import RAPIER from '@dimforge/rapier3d-compat';
let initialized = false;
let promise;

export const initRapier = () => {
    if (initialized)
        return true;
    if (!promise) {
        promise = new Promise((resolve) => {
            RAPIER.init().then(() => {
                initialized = true;
                resolve();
            });
        });
    }
    return promise;
};
