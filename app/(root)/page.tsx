import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";

const Home = () => {
	const loggedIn = {
		firstName: "Romain",
		lastName: "COR",
		email: "romain.corfmatpro@gmail.com",
	};
	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedIn?.firstName || "Guest"}
						subtext="Access and manage your account and transactions efficiently"
					/>
					<TotalBalanceBox
						accounts={[]}
						totalBanks={1}
						totalCurrentBalance={1243794258.67}
					/>
				</header>
				RECENT TRANSACTIONS
			</div>

			<RightSidebar
				user={loggedIn}
				transactions={[]}
				banks={[{ currentBalance: 123.5 }, { currentBalance: 1230.5 }]}
			/>
		</section>
	);
};

export default Home;
