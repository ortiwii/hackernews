import React, {Component} from 'react';
import Moment from 'react-moment';
import moment from 'moment'
import 'moment/locale/es';
import Button from './Button';


const Table = ({
                   list,
                   onDismiss}) =>
    <div className="table">

        {list.map(item =>
        {return <div key={item.objectID} className="table-row">
             <span style={{ width: '40%' }}>
                <a href={item.url}>{item.title}</a>
                </span>
            <span style={{ width: '30%' }}>
                {item.author}
                </span>
            <span style={{ width: '10%' }}>
                    <Moment locale='es' fromNow>{item.created_at}</Moment></span>

            <span style={{ width: '10%' }}>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                            className="button-inline"
                        > Dismiss
                        </Button>
                        </span>
        </div>;
        })}
    </div>;

export default Table;