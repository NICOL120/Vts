import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { forwardRef, ReactNode, Ref } from 'react';
import { HStack } from 'lib/ui/Stack';

interface HeaderProps {
  className?: string;
  isLoading: boolean;
  totalCount: number;
  searchInput: ReactNode;
  filters: ReactNode;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const { isLoading, totalCount } = props;

  const searchResultsLabel = isLoading ? 'Searching...' : `Displaying ${totalCount} results`;

  return (
    <VStack gap={16}>
      <VStack gap={8}>
        <Text size={32} weight="bold">
          DAO
        </Text>
        <Text size={14} color="supporting">
        </Text>
      </VStack>
      <Text size={14} color="supporting">
      </Text>
    </VStack>
  );
});
