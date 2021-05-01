import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@tailwindui/react';

// @ts-ignore
import { Content, Frame, Table, Header, Line, Button } from 'arwes';
import LakPlayerStatModal from 'Components/LakPlayerStatModal';


const LakGameCard: React.FC = (gameStats: any) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ modalPlayerData, setModalPlayerData ] = useState();

	const fullPlayerListByScore = [ ...gameStats.players ];
	// sort by high score
	fullPlayerListByScore.sort((a, b) => b.stats.scoreTG - a.stats.scoreTG);


	function fireModal(toggle: boolean, player: any) {
		setIsOpen(toggle);
		setModalPlayerData(player);
	}


	console.log(fullPlayerListByScore[0]);

	return (
		<div>
			<Header className="py-4 mb-8">
				<Content>
					<div className="table w-full">
						<div className="table-cell">
							<h1>{gameStats.map}</h1> 
						</div>
						<div className="table-cell text-right">
							<h5>Game ID: {gameStats.gameId}</h5>
						</div>
					</div>
				</Content>
			</Header>
			<div className=" max-w-md mx-auto sm:flex sm:justify-center ">
				<div className="px-6 text-center">
					<Content>
						<div className="pb-4">
							<div className="text-center text-sm text-teal-400">{gameStats.gametype}</div>
							<small className="text-xs">{gameStats.datestamp.split(/[T]/)[0]}</small>
						</div>
						<h4 className="text-3xl mb-1">{fullPlayerListByScore[0].playerName}</h4>
						<h1 className="text-4xl mb-1 font-bold text-white ">{fullPlayerListByScore[0].stats.scoreTG}</h1>

					</Content>
				</div>
			</div>

			<div className="my-6">
				<Frame border={false} corners={2} layer={'header'}>
					<Content>
						<div className="px-6 py-4">
							<h4>Leaderboard</h4>
							<Line />
							<Table
								animate
								headers={[ 'Player', 'Score', 'Kills', 'Assists', 'MAs', 'Kill Streak', '' ]}
								dataset={fullPlayerListByScore.map((player) => [
									<Link to={`/player/${player.playerGuid}`}>{player.playerName}</Link>,
									player.stats.scoreTG,
									player.stats.killsTG,
									player.stats.assistTG,
									player.stats.totalMATG,
									player.stats.killStreakTG, <Button onClick={() => fireModal(!isOpen, player)}>More</Button>
								])}
							/>
						</div>
					</Content>
				</Frame>
			</div>


			<Transition
				show={isOpen}
				enter="transition-opacity duration-75"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				className="z-50"
			>
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity ">
							<div className="absolute inset-0 bg-gray-900 opacity-75" />
						</div>

						<div
							className="inline-block align-bottom  p-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<Frame border={false} corners={2}>
								<div className="pt-5 pb-4 px-1 relative md:px-2 lg:px-6">
									<div className="absolute right-1 top-1">
										<Button
											animate
											type="button"
											layer={'secondary'}
											onClick={() => fireModal(false, {})}
											className="text-xs"
										>
											<svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</Button>
									</div>
									<LakPlayerStatModal {...modalPlayerData} />
									<div className="mt-5 sm:mt-6">
										<span className="flex w-full rounded-md shadow-sm">
											<Button
												animate
												type="button"
												layer={'secondary'}
												onClick={() => fireModal(false, {})}
												className="inline-flex justify-center w-full text-center"
											>
												Close
											</Button>
										</span>
									</div>
								</div>
							</Frame>
						</div>
					</div>
				</div>
			</Transition>			
		</div>
	);
};

export default LakGameCard;
