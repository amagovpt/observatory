import type { TFunction } from 'i18next';
import { GoodBadTab } from './goodBadTab';
import type { WebsiteAuditReport } from '@/types';

export function getGoodBadTabsConfig(t: TFunction, report: WebsiteAuditReport, mainContentWebsite: string) {
  return [
    {
      eventKey: 'tab1',
      title: t('WEBSITE.tabs.best_practices'),
      component: (
        <GoodBadTab
          main_content_website={mainContentWebsite}
          tempData={report.successDetailsTable}
          top10Data={report.bestPracticesDistribution}
          color="#15ac51"
          goodOrBad="top_3_best_practices"
          title={t('WEBSITE.top_10_best_practices_title')}
        />
      ),
    },
    {
      eventKey: 'tab2',
      title: t('WEBSITE.tabs.bad_practices'),
      component: (
        <GoodBadTab
          main_content_website={mainContentWebsite}
          tempData={report.errorsDetailsTable}
          top10Data={report.errorsDistribution}
          color="#e90018"
          goodOrBad="top_3_bad_practices"
          title={t('WEBSITE.top_10_bad_practices_title')}
        />
      ),
    },
  ];
}
