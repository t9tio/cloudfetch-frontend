import React from 'react';
import UnreadCard from './UnreadCard';

// columnCount should devide 12
const UnreadList = ({unreadContents, columnCount}) => {

    // TODO: 瀑布布局? or 对其 card?
    const list = [];
    for (let i = 0; i < unreadContents.length; i += columnCount) {
        const row = (
            <div className="tile is-ancestor" key={i}>
                {
                    unreadContents.slice(i, i + columnCount)
                        .map((unreadContent) => 
                            <UnreadCard unreadContent={unreadContent} columnCount={columnCount} key={unreadContent.id}/>
                        )
                }
            </div>
        );
        list.push(row);
    }

    return list;
};

export default UnreadList;
