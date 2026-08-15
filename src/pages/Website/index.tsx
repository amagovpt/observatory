import './styles.css';

import { useContext } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ThemeContext } from '@/context/ThemeContext';

import { BarLineGraphTabs } from './_components/barLineGraphTabs';
import { RadarGraph } from './_components/radarGraph';
import { getGoodBadTabsConfig } from './_components/goodBadTabsConfig';
import { Breadcrumb, Tabs, StatisticsHeader, LoadingComponent } from 'ama-design-system';

import { pathURL } from '@/App';
import { useWebsiteAuditReport } from '@/hooks';

export default function Website() {
  const { t } = useTranslation();

  const { theme } = useContext(ThemeContext)!;
  const mainContentWebsite = theme === 'light' ? '' : 'main_content_website';

const { directoryId: directoryIdParam, websiteId: websiteIdParam } = useParams<{
    directoryId: string;
    websiteId: string;
  }>();

  const directoryId = Number(directoryIdParam);
  const websiteId = Number(websiteIdParam);

  if (!directoryId || !websiteId || Number.isNaN(directoryId) || Number.isNaN(websiteId)) {
    return <Navigate to={pathURL} replace />;
  }

  const { data: report, isLoading: loading, isError: error } = useWebsiteAuditReport(websiteId);

  const statsTitles = [
    { subtitle: t('STATISTICS.pages'), subtitle2: '' },
    { subtitle: t('STATISTICS.pages_without_errors'), subtitle2: '' },
    { subtitle: t('STATISTICS.pages_with_errors'), subtitle2: '' },
    { subtitle: t('STATISTICS.pages_without_errors_a_info'), subtitle2: t('STATISTICS.pages_without_errors_a') },
    { subtitle: t('STATISTICS.pages_without_errors_a_aa_info'), subtitle2: t('STATISTICS.pages_without_errors_a_aa') },
    { subtitle: t('STATISTICS.pages_without_errors_a_aa_aaa_info'), subtitle2: t('STATISTICS.pages_without_errors_a_aa_aaa') },
  ];

  if (loading) {
    return <LoadingComponent darkTheme={theme} loadingText={t('MISC.loading')} />;
  }

  if (error) {
    return (
      <section className={`${mainContentWebsite} d-flex flex-column align-items-center py-5 welcome_section`}>
        <h2 className="text-center w-50">{t('MISC.unexpected_error') + ' ' + t('MISC.error_contact')}</h2>
      </section>
    );
  }

  if (!report) return null;

  const headerStats = {
    score: report.score.toFixed(1),
    oldestPage: report.oldestPageDate,
    recentPage: report.recentPageDate,
    statsTable: [
      report.pageCount,
      report.pagesWithoutErrorsCount,
      report.pagesWithErrorsCount,
      report.pagesWithoutErrorsA,
      report.pagesWithoutErrorsAA,
      report.pagesWithoutErrorsAAA,
    ],
  };

  const breadcrumbs = [
    { children: <Link to={`${pathURL}`}>{t('HEADER.NAV.observatory')}</Link> },
    { children: <Link to={`${pathURL}/directories`}>{t('HEADER.NAV.directories')}</Link> },
    { children: <Link to={`${pathURL}/directories/${directoryId}`}>{report.institutionName}</Link> },
    { title: report.name },
  ];

  const tabsGoodBad = getGoodBadTabsConfig(t, report, mainContentWebsite);

  return (
    <div className="container website">
      <div className="link_breadcrumb_container py-5">
        <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t('HEADER.NAV.youAreHere')} />
      </div>

      <div className={`title_container ${mainContentWebsite}`}>
        <div className="ama-typography-body-large bold observatorio px-3 mb-2">{report.name}</div>
        <h1 className="bold my-2">{report.name}</h1>
        <p>
          <a className="ama-typography-action-large bold" href={report.url}>
            {report.url}
          </a>
        </p>
      </div>

      {/* Statistics Header Component */}
      <section className={`bg-white ${mainContentWebsite} d-flex flex-row justify-content-center align-items-center my-5`}>
        <StatisticsHeader
          darkTheme={theme}
          stats={headerStats}
          statsTitles={statsTitles}
          doubleRow={true}
          title={t('DIRECTORIES.statistics_title')}
          subtitle={t('DIRECTORIES.statistics_subtitle')}
          oldestPage={t('STATISTICS.oldest_page_updated')}
          newestPage={t('STATISTICS.newest_page_updated')}
          gaugeTitle={[t('STATISTICS.gauge.label')]}
          gaugeDescription={t('STATISTICS.gauge.description', { value: report.score })}
          buttons={false}
        />
      </section>

      {/* Radar Graph */}
      <section className={`bg-white ${mainContentWebsite} d-flex flex-row justify-content-center align-items-center my-5`}>
        <div className="d-flex flex-column section_container py-4">
          <RadarGraph accessibilityPlotData={report.accessibilityPlotData} />
        </div>
      </section>

      {/* Bar+Line Graph */}
      <section className={`bg-white ${mainContentWebsite} d-flex flex-row justify-content-center align-items-center my-5`}>
        <div className="d-flex flex-column section_container py-4">
          <h2 className="bold mb-3">{t('DIALOGS.scores.title')}</h2>
          <BarLineGraphTabs scoreDistributionFrequency={report.scoreDistributionFrequency} pageCount={report.pageCount} />
        </div>
      </section>

      {/* Good / Bad section */}
      <div className="good_bad">
        <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={false} />
      </div>
    </div>
  );
}
