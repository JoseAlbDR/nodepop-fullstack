import StyledStatItem from '../assets/wrappers/StatItem';

interface StatItemProps {
  count: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  bcg: string;
}

const StatItem = ({ count, title, icon, color, bcg }: StatItemProps) => {
  return (
    <StyledStatItem color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </StyledStatItem>
  );
};

export default StatItem;
