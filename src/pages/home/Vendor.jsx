import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// local imports
import { useEffect, useState } from 'react';
import { Dropdown, Label, PrimaryButton, Section, TextBox } from '../../components';
import useFetch from '../../hooks/useFetch';

const schema = yup.object({
    ticketReleaseRate: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Ticket Release Rate must be a number'),
    maxTicketCapacity: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Max Ticket Capacity must be a number')
});

const Vendor = ({ isOn }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState('Select Vendor');
    const [newVendor, setNewVendor] = useState('');
    const [nameErrorMsg, setNameErrorMsg] = useState('');

    const { fetchData } = useFetch();

    const getVendors = async () => {
        const response = await fetchData(`http://localhost:8080/api/vendors/all`);
        if (response && response?.length > 0) {
            setVendors(response);
        }
    };

    useEffect(() => {
        getVendors();
    }, []);

    useEffect(() => {
        if (newVendor) {
            setNameErrorMsg('');
        }
    }, [newVendor]);

    const handleAddVendor = () => {
        if (!newVendor) {
            setNameErrorMsg(true);
            return;
        }
        const save = async () => {
            const response = await fetch('http://localhost:8080/api/vendors/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newVendor
                })
            });

            if (!response.ok) {
                response.json().then((data) => {
                    setNameErrorMsg((data?.message ?? 'Failed to save Vendor') + ': ' + response.status);
                });
            } else {
                getVendors();
                alert('Vendor saved: ' + newVendor);
            }
        };
        save();
    };

    const handleSaveConfigurations = (data) => {
        const save = async () => {
            const response = await fetch(`http://localhost:8080/api/vendors/edit/${selectedVendor.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "ticketReleaseRate": data.ticketReleaseRate,
                    "maxTicketCapacity": data.maxTicketCapacity
                })
            });

            if (!response.ok) {
                response.json().then((data) => {
                    setNameErrorMsg((data?.message ?? 'Failed to update Vendor') + ': ' + response.status);
                });
            } else {
                getVendors();
                alert('Vendor details configured..!');
            }
        };
        save();
    };

    return (
        <div className="w-10/12 mx-auto my-5">
            <Section title="Add new Vendor" className="mb-20">
                <div className="flex items-center gap-2">
                    <Label>Vendor Name:</Label>
                    <TextBox value={newVendor} onChange={(e) => setNewVendor(e.target.value)} />
                    <PrimaryButton text="Add Vendor" onClick={handleAddVendor} disabled={!isOn} />
                    {nameErrorMsg && <Label variant="error">Vendor name is required</Label>}
                </div>
            </Section>

            <Section title="Set Vendor Configurations">
                <div className="flex items-center gap-2">
                    <Label>Select Vendor:</Label>
                    <Dropdown
                        items={vendors}
                        selectedItem={selectedVendor}
                        setSelectedItem={setSelectedVendor}
                    />
                </div>

                <hr className="h-0.5 my-5 bg-gray-300 border-0" />
                <Label variant="h3">Vendor Configurations:</Label>

                <form className="ml-4 grid grid-cols-[200px_1fr] gap-4 mb-2">
                    <Label>Ticket Release Rate:</Label>
                    <TextBox
                        name="ticketReleaseRate"
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

export default Vendor;
