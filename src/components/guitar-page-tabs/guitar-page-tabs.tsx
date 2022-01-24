import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from '../../constants/guitars';
import { AppRoute } from '../../constants/routes';
import { IGuitarWithComments } from '../../types/guitar';
import DescriptionTab from './description-tab/description-tab';
import SpecificationsTab from './specifications-tab/specifications-tab';

type GuitarPageTabsType = {
  currentGuitar: IGuitarWithComments,
}

const TabName = {
  [Tabs.Specifications]: 'Характеристики',
  [Tabs.Description]: 'Описание',
} as const;

type TabType = typeof Tabs[keyof typeof Tabs];

function GuitarPageTabs({ currentGuitar }: GuitarPageTabsType) {
  const [currentTab, setCurrentTab] = useState<TabType>(Tabs.Specifications);

  const TabComponent = {
    [Tabs.Specifications]: <SpecificationsTab vendorCode={currentGuitar.vendorCode} stringCount={currentGuitar.stringCount} description={currentGuitar.description} type={currentGuitar.type} />,
    [Tabs.Description]: <DescriptionTab description={currentGuitar.description} />,
  };

  return (
    <div className="tabs" data-testid='tabs'>
      {
        Object.values(Tabs).map((tab, index) => (
          <Link
            key={`${tab + index}`}
            data-activetab={tab}
            className={`button button--medium tabs__button ${currentTab === tab ? '' : 'button--black-border'}`}
            to={AppRoute.getPlugRoute()}
            onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              setCurrentTab(tab);
            }}
          >{TabName[tab]}
          </Link>
        ))
      }

      {
        TabComponent[currentTab]
      }

    </div>
  );
}

export default GuitarPageTabs;
