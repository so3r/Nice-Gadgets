import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ProductCardSkeleton.scss';

export const ProductCardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="card-skeleton__image">
        <Skeleton height={180} />
      </div>
      <div className="card-skeleton__title">
        <Skeleton
          height={20}
          count={2}
        />
      </div>
      <div className="card-skeleton__price">
        <Skeleton
          height={30}
          width={100}
        />
      </div>
      <div className="card-skeleton__divider">
        <Skeleton height={1} />
      </div>
      <div className="card-skeleton__text">
        <Skeleton count={3} />
      </div>
      <div className="card-skeleton__buttons">
        <div className="card-skeleton__buttons--cart">
          <Skeleton
            height={40}
            width={`90%`}
          />
        </div>
        <div className="card-skeleton__buttons--fav">
          <Skeleton
            circle
            height={40}
            width={40}
          />
        </div>
      </div>
    </div>
  );
};
