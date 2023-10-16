import { BurnTokensProposalForm } from './BurnTokensProposalForm';
import { CurrentDAOTreasuryTokensProvider } from '../spend/CurrentDAOTreasuryTokentsProvider';

export const BurnTokensProposalPage = () => {
  return (
    <CurrentDAOTreasuryTokensProvider>
      <BurnTokensProposalForm />
    </CurrentDAOTreasuryTokensProvider>
  );
};
