import { GuitarWithComments } from '../../types/guitar';
import GuitarCard from '../guitar-card/guitar-card';

type CatalogListType = {
  displayedGuitars: GuitarWithComments[],
}

function CatalogList({ displayedGuitars }: CatalogListType) {
  return (
    <div className='cards catalog__cards'>
      {
        (displayedGuitars.length > 0 && displayedGuitars.map((guitar) => <GuitarCard key={guitar.id} {...guitar} />)) || <div style={{ width: '100%', textAlign: 'center' }}>Нет соединения с интернетом</div>
      }
    </div>
  );
}

export default CatalogList;
