// src/components/ConsultationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConsultationList = () => {
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/consultations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setConsultations(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConsultations();
    }, []);

    return (
        <div>
            <h2>Consultations</h2>
            <ul>
                {consultations.map((consultation) => (
                    <li key={consultation.id}>
                        <p>Date: {new Date(consultation.date).toLocaleDateString()}</p>
                        <p>Type: {consultation.type}</p>
                        <p>Condition: {consultation.condition}</p>
                        <p>Notes: {consultation.notes}</p>
                        <p>Officer: {consultation.officerId}</p>
                        <p>Patient: {consultation.patientId}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConsultationList;
