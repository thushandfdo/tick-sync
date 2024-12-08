// local imports
import { useEffect, useState } from 'react';
import { Dropdown, Label, TextBox, PrimaryButton, Section } from '../../components';

const CustomerPage = ({ isOn }) => {
    const [count, setCount] = useState(0);
    const [errMessage, setErrMessage] = useState('');
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('Select Customer');

    useEffect(() => {
        setCustomers(['Customer 1', 'Customer 2', 'Customer 3']);
    }, []);

    useEffect(() => {
        if (count > 0) {
            setErrMessage('');
        }
    }, [count]);

    const purchaseTickets = () => {
        if (count < 1 || count % 1 !== 0) {
            setErrMessage('Ticket count must be a positive number');
            return;
        }
        alert('Tickets purchased: ' + count);
    };

    return (
        <div className="w-10/12 mx-auto my-20">
            <Section title="Purchase Tickets" className="mb-20">
                <div className="flex items-center gap-2">
                    <Label>Select Customer:</Label>
                    <Dropdown
                        items={customers}
                        selectedItem={selectedCustomer}
                        setSelectedItem={setSelectedCustomer}
                    />
                </div>
                
                <hr className="h-0.5 my-5 bg-gray-300 border-0" />

                <div className="flex items-center gap-2">
                    <Label>Ticket Count:</Label>
                    <TextBox value={count} onChange={(e) => setCount(e.target.value)} />
                    <PrimaryButton text="Purchase" onClick={purchaseTickets} disabled={!isOn} />
                    {errMessage && (
                        <Label variant="error">{errMessage}</Label>
                    )}
                </div>
            </Section>
        </div>
    );
};

export default CustomerPage;
