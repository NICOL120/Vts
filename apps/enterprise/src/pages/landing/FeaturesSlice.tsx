import { LandingPageSlice } from './LandingPageSlice';
import { SliceHeader } from './SliceHeader';
import { FeaturesExplorer } from './FeaturesExplorer';
import { useDisplay } from 'hooks';
import classNames from 'classnames';
import styles from './FeaturesSlice.module.sass';

export const FeaturesSlice = () => {
  const { isMobile } = useDisplay();
  return (
    <LandingPageSlice className={classNames(styles.root, { [styles.mobile]: isMobile })}>
      <SliceHeader
        title=""
        description=""
      />
      <FeaturesExplorer />
    </LandingPageSlice>
  );
};
