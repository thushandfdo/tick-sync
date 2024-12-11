import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// local imports
import { Dropdown, Label, PrimaryButton, Section, TextBox } from '../../components';
import useFetch from '../../hooks/useFetch';

const schema = yup.object({
    ticketRetrievalRate: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Ticket Retrieval Rate must be a number'),
    maxTicketCapacity: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Max Ticket Capacity must be a number')
});

const Customer = ({ isOn }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('Select Customer');
    const [newCustomer, setNewCustomer] = useState('');
    const [nameErrorMsg, setNameErrorMsg] = useState('');

    const { fetchData } = useFetch();

    const getCustomers = async () => {
        const response = await fetchData(`http://localhost:8080/api/customers/all`);
        if (response && response?.length > 0) {
            setCustomers(response);
        }
    };
    
    useEffect(() => {
        getCustomers();
    }, []);

    useEffect(() => {
        if (newCustomer) {
            setNameErrorMsg('');
        }
    }, [newCustomer]);

    const handleAddCustomer = () => {
        if (!newCustomer) {
            setNameErrorMsg('Customer name is required');
            return;
        }
        const save = async () => {
            const response = await fetch('http://localhost:8080/api/customers/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newCustomer
                })
            });

            if (!response.ok) {
                response.json().then((data) => {
                    setNameErrorMsg((data?.message ?? 'Failed to save Customer') + ': ' + response.status);
                });
            } else {
                getCustomers();
                alert('Customer saved: ' + newCustomer);
            }
        };
        save();
    };

    const handleSaveConfigurations = (data) => {
        const save = async () => {
            const response = await fetch(`http://localhost:8080/api/customers/edit/${selectedCustomer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "customerRetrievalRate": data.ticketRetrievalRate,
                    "maxTicketCapacity": data.maxTicketCapacity
                })
            });

            if (!response.ok) {
                response.json().then((data) => {
                    setNameErrorMsg((data?.message ?? 'Failed to update Customer') + ': ' + response.status);
                });
            } else {
                getCustomers();
                alert('Customer details configured..!');
            }
        };
        save();
    };

    return (
        <div className="w-10/12 mx-auto my-5">
            <Section title="Add new Customer" className="mb-20">
                <div className="flex items-center gap-2">
                    <Label>Customer Name:</Label>
                    <TextBox value={newCustomer} onChange={(e) => setNewCustomer(e.target.value)} />
                    <PrimaryButton text="Add Customer" onClick={handleAddCustomer} disabled={!isOn} />
                    {nameErrorMsg && (
                        <Label variant="error">{nameErrorMsg}</Label>
                    )}
                </div>
            </Section>

            <Section title="Set Customer Configurations">
                <div className="flex items-center gap-2">
                    <Label>Select Customer:</Label>
                    <Dropdown
                        items={customers}
                        selectedItem={selectedCustomer}
                        setSelectedItem={setSelectedCustomer}
                    />
                </div>

                <hr className="h-0.5 my-5 bg-gray-300 border-0" />
                <Label variant="h3">Customer Configurations:</Label>

                <form className="ml-4 grid grid-cols-[200px_1fr] gap-4 mb-2">
                    <Label>Ticket Retrieval Rate:</Label>
                    <TextBox
                        name="ticketRetrievalRate"
                        register={register}
                        errors={errors}
                        placeholder="Enter a number"
                    />

                    <Label>Max Ticket Capacity:</Label>
                    <TextBox
                        name="maxTicketCapacity"
                        register={register}
                        errors={errors}
                        placeholder="Enter a number"
                    />
                </form>

                <PrimaryButton
                    text="Save Configurations"
                    onClick={handleSubmit((data) => handleSaveConfigurations(data))}
                    disabled={!isOn}
                />
            </Section>
        </div>
    );
};

export default Customer;
