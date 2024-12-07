// local imports
import { Dropdown, Label, TextBox } from "../../components";

const Home = () => {
    return <div className="flex gap-2 justify-center items-center m-2">
        <Label>Home</Label>
        <TextBox />
        <Dropdown
            name="dropdown"
            text="Dropdown"
            items={['Item 1', 'Item 2', 'Item 3']}
        />
    </div>;
};

export default Home;
