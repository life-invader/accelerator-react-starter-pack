import { useState } from 'react';
import { GuitarInfo } from '../../constants/guitars';
import { AppRoute } from '../../constants/routes';
import { IGuitarWithComments } from '../../types/guitar';

type GuitarPageTabsType = {
  currentGuitar: IGuitarWithComments,
}

const Tabs = {
  Specifications: 'Характеристики',
  Description: 'Описание',
};

function GuitarPageTabs({ currentGuitar }: GuitarPageTabsType) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="tabs">
      {
        Object.values(Tabs).map((tab, index) => <a key={`${tab + index}`} className={`button button--medium tabs__button ${currentTab === index ? '' : 'button--black-border'}`} href={AppRoute.getPlugRoute()} onClick={() => setCurrentTab(index)}>{tab}</a>)
      }
      <div className="tabs__content" id="characteristics">
        <table className="tabs__table">
          <tr className="tabs__table-row">
            <td className="tabs__title">Артикул:</td>
            <td className="tabs__value">{currentGuitar.vendorCode}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Тип:</td>
            <td className="tabs__value">{currentGuitar && GuitarInfo[currentGuitar.type]?.nameForOne}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Количество струн:</td>
            <td className="tabs__value">{currentGuitar.stringCount} струнная</td>
          </tr>
        </table>
        <p className="tabs__product-description hidden">{currentGuitar.description}</p>
      </div>
    </div>
  );
}

export default GuitarPageTabs;
