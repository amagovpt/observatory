import type { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, Input, SortingTable, type ColumnOption, type TableHeader } from 'ama-design-system';
import type { SearchResultRow } from '../search';

interface SearchSectionProps {
  mainContentClass: string;
  theme?: string;
  search: string;
  otherData: SearchResultRow[] | null;
  onSearchChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setOtherData: (data: SearchResultRow[] | null) => void;
  searchTableHeaders: TableHeader[];
  columnsOptionsSearch: Record<string, ColumnOption<SearchResultRow>>;
  nameOfIcons: string[];
}

export function SearchSection({
  mainContentClass,
  theme,
  search,
  otherData,
  onSearchChange,
  onSubmit,
  setOtherData,
  searchTableHeaders,
  columnsOptionsSearch,
  nameOfIcons,
}: SearchSectionProps) {
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setOtherData(null);
    }
    onSearchChange(e.target.value);
  };

  return (
    <section className={`search_container ${mainContentClass} d-flex flex-row justify-content-center align-items-center`}>
      <div className="d-flex flex-column section_container py-4">
        <h2 className="bold mb-4">{t('DIRECTORIES.search.title')}</h2>
        <form className="d-flex flex-row justify-content-between mb-4" onSubmit={onSubmit}>
          <Input
            darkTheme={theme}
            id="search"
            label={t('DIRECTORIES.search.label')}
            placeholder={t('DIRECTORIES.search.placeholder')}
            type="text"
            onChange={handleChange}
          />
          <button type="submit" className="search_button ms-1" aria-label={t('DIRECTORIES.search.search')}>
            <Icon name="AMA-Pesquisar-Line" />
          </button>
        </form>
        {search &&
          otherData &&
          (otherData.length > 0 ? (
            <SortingTable
              headers={searchTableHeaders}
              columnsOptions={columnsOptionsSearch}
              setDataList={setOtherData}
              dataList={otherData}
              darkTheme={theme}
              pagination={false}
              hasSort={true}
              caption={t('DIRECTORY.table.subtitle') + ' '}
              iconsAltTexts={nameOfIcons}
            />
          ) : (
            <div className="ama-typography-body-large">{t('DIRECTORIES.search.no_results')}</div>
          ))}
      </div>
    </section>
  );
}
