// local imports
import { useEffect, useState } from 'react';
import { Dropdown, Label, TextBox, PrimaryButton, Section } from '../../components';

const VendorPage = ({ isOn }) => {
    const [count, setCount] = useState(0);
    const [errMessage, setErrMessage] = useState('');
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState('Select Vendor');

    useEffect(() => {
        setVendors(['Vendor 1', 'Vendor 2', 'Vendor 3']);
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
            <Section title="Issue Tickets" className="mb-20">
                <div className="flex items-center gap-2">
                    <Label>Select Vendor:</Label>
                    <Dropdown
                        items={vendors}
                        selectedItem={selectedVendor}
                        setSelectedItem={setSelectedVendor}
                    />
                </div>
                
                <hr className="h-0.5 my-5 bg-gray-300 border-0" />

                <div className="flex items-center gap-2">
                    <Label>Ticket Count:</Label>
                    <TextBox value={count} onChange={(e) => setCount(e.target.value)} />
                    <PrimaryButton text="Issue" onClick={purchaseTickets} disabled={!isOn} />
                    {errMessage && (
                        <Label variant="error">{errMessage}</Label>
                    )}
                </div>
            </Section>
        </div>
    );
};

export default VendorPage;
