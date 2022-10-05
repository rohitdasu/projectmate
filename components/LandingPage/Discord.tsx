import animation from './lotties/discord.json';
import Lottie from 'lottie-react';

export const Discord = () => {
  const style = {
    height: 435,
    width: 435,
  };
  return (
    <div className="bg- flex flex-col items-center rounded-md">
      <Lottie animationData={animation} style={style} />
      <div>
        <h2>Join Our Discord Server</h2>
      </div>
    </div>
  );
};
