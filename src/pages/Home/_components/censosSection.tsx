import { useTranslation } from 'react-i18next';
import { Icon } from 'ama-design-system';

interface CensosStatProps {
  icon: string;
  number: string;
  label: string;
}

function StatItem({ icon, number, label }: CensosStatProps) {
  return (
    <p className="d-flex flex-column align-items-center text-center censos_column px-2">
      <Icon name={icon} />
      <span className="ama-typography-display-6 bold mt-2">{number}</span>
      <span className="ama-typography-body bold">{label}</span>
    </p>
  );
}

export function CensosSection() {
  const { t } = useTranslation();
  const stats: CensosStatProps[] = [
    { icon: 'AMA-BracoPartido-Line', number: '1 085 472', label: t('HOME.4all.disabilities._1') },
    { icon: 'AMA-CadeiraRodasPC-Line', number: '10,9%', label: t('HOME.4all.disabilities._2') },
    { icon: 'AMA-Braille-Line', number: '62,4%', label: t('HOME.4all.disabilities._3') },
    { icon: 'AMA-Idoso-Line', number: '78,7%', label: t('HOME.4all.disabilities._4') },

  ] as const;
  return (
    <div className="censos_container p-6">
      <div className="d-flex flex-row align-items-center justify-content-between mb-2 mobile">
        <h2 className="bold">{t('HOME.4all.title')}</h2>
        <span className="ama-typography-body">{t('HOME.4all.census')}</span>
      </div>
      <p className="ama-typography-body mb-4">
        {t('HOME.4all.paragraph.part1')}
        <br />
        {t('HOME.4all.paragraph.part2')}
      </p>
      <div className="d-flex justify-content-between">
        {stats.map((stat) => (
          <StatItem 
            key={stat.icon} 
            icon={stat.icon} 
            number={stat.number} 
            label={stat.label} 
          />
        ))}
      </div>
    </div>
  );
}
