import { useTranslation } from 'react-i18next';
import { Icon } from 'ama-design-system';
import { Link } from 'react-router-dom';
import { pathURL } from '@/App';

interface WelcomeSectionProps {
  mainContentHomeClass: string;
}

export function WelcomeSection({ mainContentHomeClass }: WelcomeSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      className={`bg-white ${mainContentHomeClass} d-flex flex-column align-items-center py-6 welcome_section`}
    >
      <div className="container welcome_container mb-4">
        <h1 className="mb-2 title">{t('HEADER.welcome.title')}</h1>
        <p className="subtitle">{t('HEADER.welcome.subtitle')}</p>
        <Link className="ama-typography-body-large bold text-underline top5_link d-flex" to={`${pathURL}/directories`}>
          <span className="bold ms-2">
            {' '}
            <Icon name="AMA-Edificio-Line" aria-hidden="true" /> {t('HOME.top5.button')}
          </span>
        </Link>
      </div>
    </section>
  );
}
