/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./styles.css";
import { LuFileClock } from 'react-icons/lu'
import { HiUserGroup } from 'react-icons/hi'
import { VscFileSymlinkDirectory } from 'react-icons/vsc'
import { FaDatabase } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
export default function KPISidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <div class="shadow sidebar-scroll sticky-top mt-3" style={{ overflow: 'auto', width: '220px', position: "fixed", left: 0, top: 45, background: '#fff', zIndex: 10, height: '100vh' }}>
        <button className="btn btn-primary m-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }} onClick={() => navigate('/digital-twin')}><IoMdArrowRoundBack />Back</button>
        <ul class="sidebar-list-items ps-3" id="menu">
          <li class={`sidebar-list-item cursor-pointer p-2 mt-1 ${location.pathname === '/process' ? 'backgroundSelected' : ''}`}>
            <Link to="/process" class="nav-link align-middle px-2 nav-item">
              <HiUserGroup size={20} style={{ marginBottom: '5px', color: location.pathname === '/process' ? 'white' : 'black' }} />
              <span class="ms-1 d-none d-sm-inline link-text px-1" style={{ color: location.pathname === '/process' ? 'white' : 'black' }}>Process</span>
            </Link>
          </li>
          <li class={`sidebar-list-item cursor-pointer p-2 mt-2 ${location.pathname === '/productivity' ? 'backgroundSelected' : ''}`}>
            <Link to="/productivity" class="nav-link align-middle px-2 nav-item">
              <LuFileClock size={20} style={{ color: location.pathname === '/productivity' ? 'white' : 'black' }} />
              <span class="ms-1 d-none d-sm-inline link-text px-1" style={{ color: location.pathname === '/productivity' ? 'white' : 'black' }}>Productivity</span>
            </Link>
          </li>
          <li class={`sidebar-list-item cursor-pointer p-2 mt-2 ${location.pathname === '/sustainability' ? 'backgroundSelected' : ''}`}>
            <Link to="/sustainability" class="nav-link align-middle px-2 nav-item">
              <VscFileSymlinkDirectory size={20} style={{ color: location.pathname === '/sustainability' ? 'white' : 'black' }} />
              <span class="ms-1 d-none d-sm-inline link-text px-1" style={{ color: location.pathname === '/sustainability' ? 'white' : 'black' }}>Sustainability</span>
            </Link>
          </li>
          {/* <li class="sidebar-list-item pt-4 cursor-pointer">
            <Link to="/resilience" class="nav-link align-middle px-2 nav-item">
             <FaFileContract size={20}/>
              <span class="ms-1 d-none d-sm-inline link-text px-1">Resilience</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </>
  );
}
