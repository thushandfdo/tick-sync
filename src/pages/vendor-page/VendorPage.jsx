// local imports
import { useEffect, useState } from 'react';
import { Dropdown, Label, TextBox, PrimaryButton, Section } from '../../components';
import useFetch from '../../hooks/useFetch';

const VendorPage = ({ isOn }) => {
    const [count, setCount] = useState(0);
    const [errMessage, setErrMessage] = useState('');
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState('Select Vendor');
    const [isDisabled, setIsDisabled] = useState(!isOn);

    const { fetchData } = useFetch();

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
        if (selectedVendor.name && (!selectedVendor.maxTicketCapacity || !isOn)) {
            setErrMessage('Configure vendor settings to issue tickets');
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
            setErrMessage('');
        }
    }, [selectedVendor, isOn]);

    const getBalance = () => {
        return selectedVendor.maxTicketCapacity - (selectedVendor.totalTickets ?? 0);
    }

    const issueTickets = () => {
        if (count < 1 || count % 1 !== 0) {
            setErrMessage('Ticket count must be a positive number');
            return;
        }
        const issue = async () => {
            const response = await fetch(`http://localhost:8080/api/vendors/issue/${selectedVendor.id}/${count}`);

            if (!response.ok) {
                response.json().then((data) => {
                    setErrMessage((data?.message ?? 'Failed to issue tickets') + ': ' + response.status);
                });
            } else {
                alert('Tickets Issued: ' + count);
            }
        };
        issue();
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
                    {selectedVendor.name && <Label>Balance: {getBalance()}</Label>}
                </div>
                
                <hr className="h-0.5 my-5 bg-gray-300 border-0" />

                <div className="flex items-center gap-2">
                    <Label>Ticket Count:</Label>
                    <TextBox value={count} onChange={(e) => setCount(e.target.value)} />
                    <PrimaryButton text="Issue" onClick={issueTickets} disabled={isDisabled} />
                    {errMessage && (
                        <Label variant="error">{errMessage}</Label>
                    )}
                </div>
            </Section>
        </div>
    );
};

export default VendorPage;
