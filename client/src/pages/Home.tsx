import ContentChat from "../layouts/ContentChat";
import ListChat from "../layouts/ListChat";

function HomePage() {
    return (    
        <div className="home-page">
            <div className="container mx-auto h-screen flex justify-center items-center">
                <ListChat />
                <ContentChat />
            </div>
        </div>
    );
}

export default HomePage;