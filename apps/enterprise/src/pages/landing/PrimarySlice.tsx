import classNames from 'classnames';
import { Text } from 'lib/ui/Text';
import { useDisplay } from 'hooks';
import { useNavigate } from 'react-router';
import styles from './PrimarySlice.module.sass';
import { Button } from 'lib/ui/buttons/Button';
import { HStack } from 'lib/ui/Stack';
import { ExternalLink } from 'components/link';

export const PrimarySlice = () => {
  const navigate = useNavigate();

  const { isMobile } = useDisplay();

  return (
    <div className={classNames(styles.root, { [styles.mobile]: isMobile })}>
      <Text size={40} weight="bold">
        Nico Money Dao
      </Text>
      <HStack alignItems="center" gap={20}>
        <Button
          onClick={() => {
            navigate('dashboard');
          }}
        >
          Launch App
        </Button>
      </HStack>
    </div>
  );
};
