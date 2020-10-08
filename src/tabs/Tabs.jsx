import React from 'react';
import PropTypes from 'prop-types';
import { TabHeader } from './TabHeader';
import { TabContent } from './TabContent';
import { formatClasses } from '../utils/attributes';

export function Tabs({ vertical, tabs, activeTab, onlyRenderActiveTab, bordered, onSelect }) {
  if (activeTab >= tabs.length) {
    // eslint-disable-next-line no-console
    console.error(`Invalid tab selected: ${activeTab}. The first tab will be selected instead.`);
    activeTab = 0;
  }

  return (
    <div className={formatClasses(['custom-tabs-container', vertical && 'd-flex'])}>
      <div className="tabs-navigation">
        <ul
          className={formatClasses(['nav', vertical ? 'nav-pills flex-column' : 'nav-tabs'])}
          id="myTab"
          role="tablist"
        >
          {tabs.map((tab, tabIndex) => (
            <TabHeader
              key={tabIndex}
              index={tabIndex}
              isActive={tabIndex === activeTab}
              title={tab.title}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </div>

      <div
        className={formatClasses([
          'tab-content',
          vertical ? 'flex-fill ml-3' : bordered ? 'border-left border-right border-bottom p-2' : 'py-2',
        ])}
        // id="myTabContent"
      >
        {onlyRenderActiveTab ? (
          <TabContent isActive={true} content={tabs[activeTab] && tabs[activeTab].content} />
        ) : (
          tabs.map((tab, tabIndex) => (
            <TabContent key={tabIndex} isActive={tabIndex === activeTab} content={tab.content} />
          ))
        )}
      </div>
    </div>
  );
}

Tabs.defaultProps = {
  activeTab: 0,
  bordered: false,
  onlyRenderActiveTab: false,
  onSelect: () => {},
  vertical: false,
};

Tabs.propTypes = {
  activeTab: PropTypes.number,
  bordered: PropTypes.bool,
  onlyRenderActiveTab: PropTypes.bool,
  onSelect: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
    })
  ).isRequired,
  vertical: PropTypes.bool,
};
