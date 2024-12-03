import {PollOptionType} from '@types';

export function getOptionPercentage(
  options: PollOptionType[],
  optionId: string,
) {
  // Umumiy ovozlar sonini hisoblash
  const totalVotes = options.reduce(
    (sum, option) => sum + option.votesCount,
    0,
  );

  // Berilgan optionId bo'yicha variantni topish
  const targetOption = options.find(option => option.id === optionId);

  if (!targetOption) {
    throw new Error('Option not found');
  }

  // Foizni hisoblash
  const percentage =
    totalVotes > 0 ? (targetOption.votesCount / totalVotes) * 100 : 0;

  return percentage.toFixed(0) + '%'; // Foizni 2 xonali aniqlik bilan qaytarish
}
