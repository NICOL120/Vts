import { ExternalLink } from 'components/link';
import { discordUrl, mediumUrl, telegramUrl, twitterUrl } from 'navigation';
import { SliceHeader } from './SliceHeader';
import { ReactComponent as TwitterIcon } from 'components/assets/TwitterSolidLogo.svg';
import { ReactComponent as DiscordIcon } from 'components/assets/DiscordSolidLogo.svg';
import { ReactComponent as TelegramIcon } from 'components/assets/TelegramLogo.svg';
import { ReactComponent as MediumIcon } from 'components/assets/MediumLogo.svg';
import { useDisplay } from 'hooks';
import classNames from 'classnames';
import styles from './LandingFooter.module.sass';
import { Button } from 'lib/ui/buttons/Button';
import { Text } from 'lib/ui/Text';
import { HStack } from 'lib/ui/Stack';

export const LandingFooter = () => {
  const { isDesktop, isMobile } = useDisplay();

  // Add comments to disable Twitter and Medium buttons
  const shouldShowTwitter = false; // Hide Twitter button
  const shouldShowMedium = false;  // Hide Medium button

  return (
    <div className={classNames(styles.root, { [styles.mobile]: isMobile })}>
      <div className={styles.header}>
        <SliceHeader
          title=""
          description=""
        />
        <div className={styles.actions}>
          {shouldShowTwitter && (
            <ExternalLink to={twitterUrl}>
              (<Button kind="secondary" as="div">
                Twitter / X
              </Button>
            </ExternalLink>
          )}
          {shouldShowMedium && (
            <ExternalLink to={mediumUrl}>
              <Button kind="secondary" as="div">
                Medium
              </Button>
            </ExternalLink>
          )}
        </div>
      </div>
    </div>
  );
}
