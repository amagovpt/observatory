import './styles.css';

import { useContext, useEffect, useState, type FormEvent } from 'react';
import { useDirectoriesStatistics,useDirectoriesRank } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ThemeContext } from '@/context/ThemeContext';

import { StatisticsHeader, SortingTable, Breadcrumb, LoadingComponent } from 'ama-design-system';

import { searchFuntion, type SearchResultRow } from './search';
import { getDirectoriesTable } from './tableConfig';
import { SearchSection } from './_components/searchSection';

import { pathURL } from '@/App';
import type { DirectorySummary } from '@/types';

export default function Directories() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext)!;
  const mainContentDirectories = theme === 'light' ? '' : 'main_content_directories';

  const { data: directoriesRank, isLoading: isLoadingRank, isError: isErrorRank, error: errorRank } = useDirectoriesRank();
  const {data: directoryStats, isLoading: isLoadingStats, isError: isErrorStats, error: errorStats} = useDirectoriesStatistics();
  
  console.log('directoriesRank', JSON.stringify(directoriesRank));
  const [search, setSearch] = useState('');
  const [otherData, setOtherData] = useState<SearchResultRow[] | null>(null);
  const [directoriesList, setDirectoriesList] = useState<DirectorySummary[]>([]);

  const { searchTableHeaders, columnsOptionsSearch, directoriesHeaders, columnsOptions, statsTitles, nameOfIcons, ariaLabels } =
    getDirectoriesTable(t);

  useEffect(() => {
    if (directoriesRank) {
      setDirectoriesList(directoriesRank);
    }
  }, [directoriesRank]);
  const breadcrumbs = [{ children: <Link to={`${pathURL}`}>{t('HEADER.NAV.observatory')}</Link> }, { title: t('HEADER.NAV.directories') }];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (directoriesRank) setOtherData(searchFuntion(search, directoriesRank as any));
  };

  if (isLoadingRank || isLoadingStats) {
    return <LoadingComponent darkTheme={theme} loadingText={t('MISC.loading')} />;
  }

  if (isErrorRank || isErrorStats) {
    return (
      <section className={`${mainContentDirectories} d-flex flex-column align-items-center py-5 welcome_section`}>
        <h2 className="text-center w-50">{errorRank?.message || errorStats?.message}</h2>
      </section>
    );
  }

  if (!directoriesRank || !directoryStats) return null;
  const headerStats = {
    score: directoryStats?.score ?? 0,
    oldestPage: directoryStats?.oldestPageDate ?? '', 
    recentPage: directoryStats?.recentPageDate ?? '', 
    statsTable: [
      directoryStats?.directoriesCount ?? 0,
      directoryStats?.entitiesCount ?? 0,
      directoryStats?.websitesCount ?? 0,
      directoryStats?.pagesCount ?? 0,
    ],
  };

  return (
    <div className="container">
      <div className="link_breadcrumb_container py-5">
        <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t('HEADER.NAV.youAreHere')} />
      </div>

      <div className="title_container">
        <div className="ama-typography-body-large bold observatorio px-3">{t('HEADER.NAV.observatory')}</div>
        <h1 className="bold my-2">{t('HEADER.NAV.directories')}</h1>
      </div>

      {/* Statistics Header Component */}
      <section className={`bg-white ${mainContentDirectories} d-flex flex-row justify-content-center align-items-center my-5`}>
        <StatisticsHeader
          darkTheme={theme}
          stats={headerStats}
          statsTitles={statsTitles}
          title={t('DIRECTORIES.statistics_title')}
          subtitle={t('DIRECTORIES.statistics_subtitle')}
          oldestPage={t('STATISTICS.oldest_page_updated')}
          newestPage={t('STATISTICS.newest_page_updated')}
          gaugeTitle={[t('STATISTICS.gauge.label')]}
          gaugeDescription={t('STATISTICS.gauge.description', { value: directoryStats.score })}
          buttons={false}
        />
      </section>

      {/* MAIN Directories TABLE */}
      <section className={`bg-white ${mainContentDirectories} d-flex flex-row justify-content-center align-items-center my-5`}>
        <div className="d-flex flex-column section_container py-4 m-0 directories_container">
          <h2 className="bold pb-3 m-0">{t('DIRECTORIES.table.title')}</h2>
          <SortingTable
            darkTheme={theme}
            hasSort={true}
            headers={directoriesHeaders}
            setDataList={setDirectoriesList}
            dataList={directoriesList}
            caption={t('DIRECTORIES.table.title')}
            columnsOptions={columnsOptions}
            pagination={false}
            ariaLabels={ariaLabels}
          />
        </div>
      </section>

      <SearchSection
        mainContentClass={mainContentDirectories}
        theme={theme}
        search={search}
        otherData={otherData}
        onSearchChange={setSearch}
        onSubmit={handleSubmit}
        setOtherData={setOtherData}
        searchTableHeaders={searchTableHeaders}
        columnsOptionsSearch={columnsOptionsSearch}
        nameOfIcons={nameOfIcons}
      />
    </div>
  );
}
