import React, {  } from "react";
import {} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function HomePage() {

    const { t } = useTranslation();

  return (
      <div>
        <div className="add-border">
            <div className="user-card">
                <div className="gap-2">
                    <h2>{t('app_name')}</h2>
                    <br/>
                    {t('app_author')}
                </div>
            </div>
        </div>
      </div>
  );
}

export default HomePage;
