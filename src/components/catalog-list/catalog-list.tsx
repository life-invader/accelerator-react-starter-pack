import { IGuitarWithComments } from '../../types/guitar';
import GuitarCard from '../guitar-card/guitar-card';

type CatalogListType = {
  displayedGuitars: IGuitarWithComments[],
}

function CatalogList({ displayedGuitars }: CatalogListType) {
  return (
    <div className='cards catalog__cards'>
      {
        (displayedGuitars.length > 0 && displayedGuitars.map((guitar) => <GuitarCard key={guitar.id} {...guitar} />))
      }
    </div>
  );
}

export default CatalogList;
