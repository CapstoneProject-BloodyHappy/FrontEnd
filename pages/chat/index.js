import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faEnvelope, faMobile, faBellSlash, faBars, faCircleXmark, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

const LiveChat = () => {

    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
	const changeShowSidebar = () => setShowSidebar(!showSidebar);
	const sidebarClass = showSidebar ? 'sidebar_chat hidden' : 'sidebar_chat';

	return (
		<div
			className="bg-white"
			style={{
				borderRadius: "16px",
				margin: "10px 15px 0px 15px",
				marginBottom: "5px",
				boxShadow: "0px 0px 15px 3px #A8D8F380, 0px 5px 15px -5px #00000080",
			}}
		>
			<div className="app-container">
				<div className="chat-container">
					<div className="menuitem-bar">
						{
						showSidebar ? (
							<FontAwesomeIcon icon={faBars}
							style={{
								display: "block",
								color: "rgba(255, 255, 255, 0.9)",
								margin:"auto",
								marginTop: "10px",
							}}
							onClick={changeShowSidebar}
							/>                
						) : (
							<FontAwesomeIcon icon={faCircleXmark} 
							style={{
								display: "block",
								color: "rgba(255, 255, 255, 0.9)",
								margin:"auto",
								marginTop: "10px",
								fontSize: "20px",
							}}
							onClick={changeShowSidebar}
							/>
						)
						}
				</div>	

					<div className={sidebarClass}>
						<div className="d-flex">
							<input
								type="text"
								placeholder="Search"
								className={`search-bar-user ${
									isSearchBarFocused ? "focused" : ""
								}`}
								onFocus={() => setIsSearchBarFocused(true)}
								onBlur={() => setIsSearchBarFocused(false)}
							/>
							<div className="search-button">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
							</div>
						</div>
					</div>

					<div className="chat-room">
                        <div className="centered-container">
                            <h1>Live Chat</h1>
                        </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiveChat;
