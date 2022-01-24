import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { IGuitarWithComments } from '../../types/guitar';
import DescriptionTab from './description-tab/description-tab';
import SpecificationsTab from './specifications-tab/specifications-tab';

type GuitarPageTabsType = {
  currentGuitar: IGuitarWithComments,
}

const Tabs = {
  Specifications: {
    name: 'Характеристики',
    title: 'specs',
  },
  Description: {
    name: 'Описание',
    title: 'desc',
  },
};

function GuitarPageTabs({ currentGuitar }: GuitarPageTabsType) {
  const [currentTab, setCurrentTab] = useState<string>(Tabs.Specifications.title);

  const TabComponent = {
    [Tabs.Specifications.title]: <SpecificationsTab vendorCode={currentGuitar.vendorCode} stringCount={currentGuitar.stringCount} description={currentGuitar.description} type={currentGuitar.type} />,
    [Tabs.Description.title]: <DescriptionTab description={currentGuitar.description} />,
  };

  return (
    <div className="tabs" data-testid='tabs'>
      {
        Object.values(Tabs).map(({ name, title }, index) => (
          <Link
            key={`${name + index}`}
            data-activetab={title}
            className={`button button--medium tabs__button ${currentTab === title ? '' : 'button--black-border'}`}
            to={AppRoute.getPlugRoute()}
            onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              setCurrentTab(title);
            }}
          >{name}
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
