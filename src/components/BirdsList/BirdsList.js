import React  from 'react';
import './BirdsList.css';
import birdsData from '../../data/birds';

const renderItems = (props, arr) => {
  
  const className = props.page % 2 === 1 ? 'list-group-item default' : 'list-group-item'

  return arr.map(item => {
    const { id, name } = item;
    return (
      <li className={className}
          key={id}
          onClick={(event) => props.onItemSelected(id, event)} >
        <span className="li-btn">
        </span>
        {name}
      </li>
    );
  });
}

const BirdsList = (props) => {
    const items = renderItems(props, birdsData[props.page]);
    return (
    <div className="col-md-6">
      <ul className="item-list list-group">
        {items}
      </ul>
    </div>
  );
}

export default BirdsList;
