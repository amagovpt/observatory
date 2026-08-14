import './styles.css';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '@/context/ThemeContext';
import { useGlobalStatistics } from '@/hooks';
import { ComplianceStatus, BadgesCount } from '@/types';
import type { MetricItem } from './_components/achievementPerType';

import { StatisticsHeader, LoadingComponent } from 'ama-design-system';
import { Top5_Practices } from './_components/top5_practices';
import { AchievementPerType } from './_components/achievementPerType';
import { ObservatoryInfoTabs } from './_components/observatoryInfoTabs';
import { WelcomeSection } from './_components/welcomeSection';
import { Top5WebsitesTable } from './_components/top5WebsitesTable';
import { CensosSection } from './_components/censosSection';

export default function Home() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext)!;
  const mainContentHomeClass = theme === 'light' ? '' : 'main_content_home';
  const { data, isLoading, isError, error } = useGlobalStatistics();
  console.log('data', JSON.stringify(data));
  const statsTitles = [
    t('STATISTICS.directories'),
    t('STATISTICS.entities'),
    t('STATISTICS.websites'),
    t('STATISTICS.pages'),
  ];

  if (isLoading) {
    return <LoadingComponent darkTheme={theme} loadingText={t('MISC.loading')} />;
  }

  if (isError) {
    return (
      <section className={`${mainContentHomeClass} d-flex flex-column align-items-center py-6 welcome_section`}>
        <h2 className="text-center w-50">{error?.message}</h2>
      </section>
    );
  }

  if (!data) return null;
const declarationConfig = {
    title: t('NUMBERS.declaration.subtitle1'),
    icon: 'AMA-Declaracao-Line',
    translationType: 'declaration' as const,
    getKeys: (m: MetricItem) => {
      const item = m as ComplianceStatus;
      return { good: item.conform, semi: item.partial, bad: item.not_conform };
    },
    colors: { good: 'green', semi: 'yellow', bad: 'red' },
    colorTitles: {
      good: t('NUMBERS.declaration.conform'),
      semi: t('NUMBERS.declaration.partial'),
      bad: t('NUMBERS.declaration.non_conform'),
    },
  };

  const badgeConfig = {
    title: t('NUMBERS.badge.subtitle1'),
    icon: 'AMA-SeloDark2-Line',
    translationType: 'badge' as const,
    getKeys: (m: MetricItem) => {
      const item = m as BadgesCount;
      return { good: item.gold, semi: item.silver, bad: item.bronze };
    },
    colors: { good: 'gold', semi: 'silver', bad: 'bronze' },
    colorTitles: {
      good: t('NUMBERS.badge.gold'),
      semi: t('NUMBERS.badge.silver'),
      bad: t('NUMBERS.badge.bronze'),
    },
  };
const headerStats = {
    score: data?.score ?? 0,
    oldestPage: data?.oldestPageDate ?? '', 
    recentPage: data?.recentPageDate ?? '', 
    statsTable: [
      data?.directoriesCount ?? 0,
      data?.entitiesCount ?? 0,
      data?.websitesCount ?? 0,
      data?.pagesCount ?? 0,
    ],
  };
  return (
    <>
      <WelcomeSection mainContentHomeClass={mainContentHomeClass} />

      <div className="container pt-6">
        {/* Statistics Header Component */}
        <section
          className={`bg-white ${mainContentHomeClass} d-flex flex-row justify-content-center align-items-center my-4 section_statistics`}
        >
          <StatisticsHeader
            darkTheme={theme}
            stats={headerStats}
            statsTitles={statsTitles}
            title={t('DIRECTORIES.statistics_title')}
            subtitle={t('DIRECTORIES.statistics_subtitle')}
            oldestPage={t('STATISTICS.oldest_page_updated')}
            newestPage={t('STATISTICS.newest_page_updated')}
            gaugeTitle={[t('STATISTICS.gauge.label')]}
            gaugeDescription={t('STATISTICS.gauge.description', { value: data.score })}
            buttons={false}
          />
        </section>

        <Top5WebsitesTable
          mainContentHomeClass={mainContentHomeClass}
          websites={data.topWebsites}
          recentPage={data.recentPageDate}
        />

        {/* Top 5 Good and Bad Practices */}
        <div className="d-flex my-6 top5_best_good">
          <Top5_Practices data={data.topBestPractices} title={t('HOME.summary.best_practices_title')} icon="AMA-Check-Line" />
          <Top5_Practices data={data.topErrors} title={t('HOME.summary.errors_title')} icon="AMA-Wrong-Line" />
        </div>
      </div>

      <section className={`bg-white ${mainContentHomeClass} d-flex flex-column section last_section pt-6`}>
        <div className="container">
          {/* Declarations data */}
          <h2 className="bold">{t('NUMBERS.declaration.title')}</h2>
          <p className="ama-typography-body-large">{t('NUMBERS.declaration.paragraph')}</p>
          <AchievementPerType data={data.declarations} config={declarationConfig} />

          {/* Badges data */}
          <h2 className="bold">{t('NUMBERS.badge.title')}</h2>
          <p className="ama-typography-body-large">{t('NUMBERS.badge.paragraph')}</p>
          <AchievementPerType data={data.badges} config={badgeConfig} />

          <div className="tabs-grid my-6">
            <ObservatoryInfoTabs />
          </div>

          <CensosSection />
        </div>
      </section>
    </>
  );
}