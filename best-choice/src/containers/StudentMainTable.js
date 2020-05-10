import React, {useEffect} from 'react';
import StudentMainTableComponent from '../components/StudentMainTable';

import {connect} from 'react-redux';
import {compact, filter} from 'lodash';

import {updateTopics, occupyTopic} from '../actions/topic';
import {makeAuthHeader} from '../helpers/jwt';

import history from '../routes/history';


function StudentMainTable(props) {
    const {
        topics,
        // eslint-disable-next-line no-shadow
        updateTopics,
        onOccupyButtonClick,
        group,
    } = props;

    const onLogoutClick = () => {
        localStorage.removeItem('token');
        history.push('/auth');
    };

    useEffect(() => {
        // дожидаемся актуализации пользователя
        if (!group) {
            return;
        }

        async function fetchTopics() {
            const url = `http://localhost:5000/topics/?group=${group}`;

            const newTopics = await fetch(url, {headers: makeAuthHeader()})
                .then(response => response.json())
                .then(result => {
                    const data = {};
                    result.forEach(topic => {
                        const {title, adviser, owner} = topic;
                        data[title] = {
                            title,
                            adviser: adviser && compact([adviser.lastName, adviser.firstName, adviser.midName]).join(' '),
                            owner: owner && compact([owner.lastName, owner.firstName]).join(' '),
                            group,
                            ownerLogin: owner && owner.login,
                        };
                    });

                    return data;
                });
            // eslint-disable-next-line no-use-before-define
            updateTopics(newTopics);
        }

        fetchTopics();
        setInterval(fetchTopics, 1000);
    }, [group]);

    return (
        <StudentMainTableComponent
            topics={topics}
            onOccupyButtonClick={onOccupyButtonClick}
            onLogoutClick={onLogoutClick}
        />
    );
}

const mapStateToProps = state => {
    const {group} = state.user.current;
    const topics = filter(state.topic, topic => topic.group === group);
    return {
        topics,
        group,
    };
};

const mapDispatchToProps = dispatch => ({
    updateTopics: topics => dispatch(updateTopics(topics)),
    onOccupyButtonClick: title => dispatch(occupyTopic(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentMainTable);
