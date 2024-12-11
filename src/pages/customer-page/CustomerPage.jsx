// local imports
import { useEffect, useState } from 'react';
import { Dropdown, Label, TextBox, PrimaryButton, Section } from '../../components';
import useFetch from '../../hooks/useFetch';

const CustomerPage = ({ isOn }) => {
    const [count, setCount] = useState(0);
    const [errMessage, setErrMessage] = useState('');
    const [customers, setCustomers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('Select Customer');
    const [selectedVendor, setSelectedVendor] = useState('Select Vendor');
    const [isDisabled, setIsDisabled] = useState(!isOn);

    const { fetchData } = useFetch();

    useEffect(() => {
        const getCustomers = async () => {
            const response = await fetchData(`http://localhost:8080/api/customers/all`);
            if (response && response?.length > 0) {
                setCustomers(response);
            }
        };
        getCustomers();
    }, [fetchData]);

    useEffect(() => {
        const getVendors = async () => {
            const response = await fetchData(`http://localhost:8080/api/vendors/all`);
            if (response && response?.length > 0) {
                setVendors(response);
            }
        };
        getVendors();
    }, [fetchData]);

    useEffect(() => {
        if (count > 0) {
            setErrMessage('');
        }
    }, [count]);

    useEffect(() => {
        if (selectedCustomer.name && (!selectedCustomer.maxTicketCapacity || !isOn)) {
            setErrMessage('Configure customer settings to purchase tickets');
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
            setErrMessage('');
        }
    }, [selectedCustomer, isOn]);

    const getBalance = () => {
        return selectedCustomer.maxTicketCapacity - (selectedCustomer.totalTickets ?? 0);
    }

    const purchaseTickets = () => {
        if (count < 1 || count % 1 !== 0) {
            setErrMessage('Ticket count must be a positive number');
            return;
        }
        const purchase = async () => {
            const response = await fetch('http://localhost:8080/api/tickets/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerId: selectedCustomer.id,
                    vendorId: selectedVendor.id,
                    count: count
                })
            });

            if (!response.ok) {
                response.json().then((data) => {
                    setErrMessage((data?.message ?? 'Failed to purchase tickets') + ': ' + response.status);
                });
            } else {
                alert('Tickets purchased: ' + count);
            }
        };
        purchase();
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
                    {selectedCustomer.name && <Label>Balance: {getBalance()}</Label>}
                </div>

                <hr className="h-0.5 my-5 bg-gray-300 border-0" />

                <div className="flex items-center gap-2 mb-5">
                    <Label>Select Vendor:</Label>
                    <Dropdown
                        items={vendors}
                        selectedItem={selectedVendor}
                        setSelectedItem={setSelectedVendor}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Label>Ticket Count:</Label>
                    <TextBox value={count} onChange={(e) => setCount(e.target.value)} />
                    <PrimaryButton text="Purchase" onClick={purchaseTickets} disabled={isDisabled} />
                    {errMessage && <Label variant="error">{errMessage}</Label>}
                </div>
            </Section>
        </div>
    );
};

export default CustomerPage;
