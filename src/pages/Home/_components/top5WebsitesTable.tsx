import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { pathURL } from '@/App';
import { WebsiteRank } from '@/types';

interface Top5WebsitesTableProps {
  mainContentHomeClass: string;
  websites: WebsiteRank[];
  recentPage: string;
}

export function Top5WebsitesTable({ mainContentHomeClass, websites, recentPage }: Top5WebsitesTableProps) {
  const { t } = useTranslation();

  return (
    <section className={`${mainContentHomeClass} d-flex flex-column justify-content-center my-6 top5_websites`}>
      <h2 className="bold mb-2">{t('HOME.top5.title')}</h2>
      <div className="d-flex mt-4 top5websites">
        <div className="description w-50">
          <div className="ama-typography-body mt-2">{t('HOME.top5.last_updated') + ' ' + recentPage}</div>
          <p className="ama-typography-body mt-4">
            {t('HOME.top5.paragraph.part1') + ' ' + t('HOME.top5.paragraph.part2') + ' ' + t('HOME.top5.paragraph.part3')}
          </p>
        </div>
        <table className="table top5table">
          <caption className="visually-hidden">{t('HOME.top5.title')}</caption>
          <thead>
            <tr>
              <th className="d-flex justify-content-center">{t('HOME.top5.rank')}</th>
              <th>{t('HOME.top5.name')}</th>
              <th className="d-flex justify-content-center">{t('HOME.top5.score')}</th>
            </tr>
          </thead>
          <tbody>
            {websites.map((website) => (
              <tr key={website.id}>
                <td>
                  <div className="ama-typography-body top5_number text-center">{website.index}</div>
                </td>
                <td>
                  <Link
                    to={`${pathURL}/directories/${website.directoryId}/${website.id}`}
                    className="top5_link ama-typography-body-large bold"
                  >
                    {website.name}
                  </Link>
                </td>
                <td className="ama-typography-body-large bold text-center">{website.score.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}