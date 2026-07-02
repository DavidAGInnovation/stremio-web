// Copyright (C) 2017-2026 Smart code 203358507

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatch } from 'react-router';
import { useServiceWorkerUpdater, useTimeout } from 'stremio/common';
import styles from './WebUpdateScreen.less';

const APPLY_DELAY = 2000;

const WebUpdateScreen = () => {
    const { t } = useTranslation();
    const { updateReady, applyUpdate } = useServiceWorkerUpdater();
    const isPlayer = useMatch('/player/*');
    const timeout = useTimeout(APPLY_DELAY);
    const visible = updateReady && isPlayer === null;

    useEffect(() => {
        if (visible) {
            timeout.start(applyUpdate);

            return timeout.cancel;
        }
    }, [visible]);

    if (!visible) {
        return null;
    }

    return (
        <div className={styles['web-update-screen']}>
            <img className={styles['logo']} src={require('/assets/images/stremio_symbol.png')} alt={' '} />
            <div className={styles['title']}>
                {t('UPDATER_TITLE')}
            </div>
            <div className={styles['progress']} aria-hidden={true}>
                <div className={styles['progress-value']} />
            </div>
        </div>
    );
};

export default WebUpdateScreen;
