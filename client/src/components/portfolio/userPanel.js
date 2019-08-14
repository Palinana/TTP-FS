import React from 'react';

const UserPanel = ({ user, weekDay, date }) => {
    return (
        <div className="row">
            <div className="user-panel col-12 d-flex">
                <div className="mr-auto">
                    <div className="user-panel__weekday">{weekDay}</div>
                    <div className="user-panel__date">{date}</div>            
                </div>

                <div className="text-right">
                    <div className="user-panel__username">{user.name}</div>
                    <div className="user-panel__balance-title">Available Balance</div>
                    <h1 className="user-panel__balance">${user.balance}</h1>
                </div>
            </div>
        </div>
    )
};
  
export default UserPanel;