import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import '../css/FAQ.css';
import {Image} from "react-bootstrap";
import * as PropTypes from "prop-types";
import button from "bootstrap/js/src/button";

import {Game} from "./Game";
import FAQ from "./FAQ";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {useState} from "react";

let tamagoshiImage = 'project_example_1.png';

// const activeStyle = {
//     background: 'hotpink',
//     color: 'white'
// };
// const [activeStyle, setActiveStyle] = useState("blue")

export const PopUp = ({toggleLogin}) => {
    return (
        <div className="loginMenu" style={{height: '50%'}}>
            <div className="menu-popup">
                <button onClick={toggleLogin} style={{position: 'absolute', top: '10px', right: '10px'}}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <button>Submit</button>
            </div>
        </div>
    );
}

export const CharTable = () => {
    const [count, setCount] = React.useState("1");

    const handleChar = (event, newValue) => {
        setCount(newValue);
    };
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Tabs
                defaultActiveKey="body"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="body" title="Body" onClick={handleChar} count="1">
                    <h1>body</h1>
                </Tab>
                <Tab eventKey="Hats" title="Hats" onClick={handleChar} count="2">
                    <h1>hats</h1>
                </Tab>
                <Tab eventKey="Weapons" title="Weapons" onClick={handleChar} count="3">
                    <h1>weapons</h1>
                </Tab>
            </Tabs>
            <Image style={{maxHeight: "350px"}} src={tamagoshiImage} alt="Tamagoshi"/>
            <button className="diceButton"><img src="dice.svg" className="edit-img"/>
            </button>
        </div>
    );
};


//HAND
export const handTable = () => {
    return (
        <div style={{display: "flex", height: "250px", width: "210px"}}>
            <Image style={{maxHeight: "fit-content"}} src="" alt="Tamagoshi"/>
        </div>
    );
};


export const PopUpEdit = ({toggleEdit}) => {

    return (
        <div className="editMenu">
            <ToggleButtonGroupControlled/>


            <div className="edit-menu-content">
                <button onClick={toggleEdit} className="loginButtons" style={{background: "blue", bottom: 0}}>
                    Save
                </button>
                <button onClick={toggleEdit} className="loginButtons" style={{bottom: 0}}>
                    Cancel
                </button>

            </div>

        </div>
    );
}


function ToggleButtonGroupControlled() {
    const [value, setValue] = useState([1, 3]);
    const [notificationImage, setNotificationImage] = React.useState("mdi_notifications.svg");
    const [musicImage, setMusicImage] = React.useState("ph_music-notes-fill.svg");
    const [soundImage, setSoundImage] = React.useState("sound.svg");

    const toggleNotification = () => {
        setNotificationImage(notificationImage === 'mdi_notifications.svg' ? 'mdi_notifications-off.svg' : 'mdi_notifications.svg');
    }
    const toggleMusic = () => {
        setMusicImage(musicImage === 'ph_music-notes-fill.svg' ? 'mdi_music-off.svg' : 'ph_music-notes-fill.svg');
    }
    const toggleSound = () => {
        setSoundImage(soundImage === 'sound.svg' ? 'teenyicons_sound-off-solid.svg' : 'sound.svg');
    }
    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => setValue(val);

    return (
        <div>
            <div style={{position: "fixed", marginLeft: "300px"}}>
                <button className="soundButton" onClick={toggleSound}><img src={soundImage}
                                                                           className="edit-img"/>
                </button>
                <button className="musicButton" onClick={toggleMusic}><img src={musicImage}
                                                                           className="edit-img"/>
                </button>
                <button className="notificationButton" onClick={toggleNotification}><img
                    src={notificationImage}
                    className="edit-img"/></button>
            </div>
            <div>
            <Tabs
                defaultActiveKey="Character"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Character" title="Character" onClick={handleChange} value="1">
                    <CharTable/>
                </Tab>
                <Tab eventKey="Hand" title="Hand" onClick={handleChange} value="2">
                    <h1>hand</h1>
                </Tab>
            </Tabs>
            </div>

        </div>
    );
}

