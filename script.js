//ROOM DATA
  const rooms = [
    { id:1, title:'Room near HVPM College', price:5000, distance:0.8, type:'Girls', verified:true, owner:'Sunakshi', phone:'98765 43210', amenities:['WiFi','AC','Meals'] },
    { id:2, title:'PG near VidyaBharti Mahavidyalaya',  price:4000, distance:1.2, type:'Girls', verified:true, owner:'Shreyash Patne', phone:'91234 56789', amenities:['WiFi','Meals','Attached Bath'] },
    { id:3, title:'Flat near sgbau University', price:7000, distance:0.5, type:'Flat', verified:false, owner:'Sumedh Tayade', phone:'99887 76655', amenities:['AC','Parking','24/7 Water'] },
    { id:4, title:'Boys PG near Medical College', price:3500, distance:1.5, type:'PG', verified:true, owner:'Amit Desai', phone:'88776 55443', amenities:['WiFi','Meals'] },
    { id:5, title:'Girls Hostel near Law College', price:4500, distance:0.9, type:'Girls', verified:true, owner:'Sunita Joshi', phone:'77665 44332', amenities:['WiFi','AC','Attached Bath','Meals'] },
    { id:6, title:'1BHK Flat near Engineering College', price:8000, distance:0.3, type:'Flat', verified:false, owner:'Ravi Kumar', phone:'66554 33221', amenities:['AC','Parking','WiFi'] },
  ];

  let activeFilter = 'All';
  let currentRoom  = null;

  
  function renderRooms(list) {
    const container = document.getElementById('room-list');
    if (list.length === 0) {
      container.innerHTML = '<div class="no-rooms">No rooms found. Try a different filter.</div>';
      return;
    }
    container.innerHTML = list.map(room => `
      <div class="card" onclick="openDetail(${room.id})">
        <div class="card-img">
          Room Photo
          ${room.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
        </div>
        <div class="card-body">
          <h3>${room.title}</h3>
          <div class="price">Rs. ${room.price.toLocaleString()} / month</div>
          <div class="distance">${room.distance} km from college · ${room.type}</div>
          <div class="tags">${room.amenities.map(a => `<span class="tag">${a}</span>`).join('')}</div>
          <button class="card-btn" onclick="event.stopPropagation(); openContact(${room.id})">Contact Owner</button>
        </div>
      </div>
    `).join('');
  }

  //FILTER 
  function setFilter(type, btn) {
    activeFilter = type;
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterRooms();
  }

  function filterRooms() {
    const search = document.getElementById('search-input').value.toLowerCase();
    let filtered = rooms.filter(r => {
      const matchType   = activeFilter === 'All' || r.type === activeFilter;
      const matchSearch = r.title.toLowerCase().includes(search);
      return matchType && matchSearch;
    });
    renderRooms(filtered);
  }

  //DETAILS PAGE 
  function openDetail(id) {
    currentRoom = rooms.find(r => r.id === id);
    document.getElementById('detail-title').textContent    = currentRoom.title;
    document.getElementById('detail-price').textContent    = `Rs. ${currentRoom.price.toLocaleString()} / month`;
    document.getElementById('detail-sub').textContent      = `${currentRoom.distance} km from college · ${currentRoom.type}`;
    document.getElementById('detail-amenities').innerHTML  =
      currentRoom.amenities.map(a => `
        <div class="amenity-item">
          <div class="amenity-dot"></div>${a}
        </div>`).join('');
    showPage('detail');
  }

  //CONTACT MODAL 
  function openContact(id) {
    currentRoom = rooms.find(r => r.id === id);
    openModal();
  }

  function openModal() {
    if (!currentRoom) currentRoom = rooms[0];
    document.getElementById('modal-avatar').textContent = currentRoom.owner[0];
    document.getElementById('modal-name').textContent   = currentRoom.owner;
    document.getElementById('modal-phone').textContent  = '+91 ' + currentRoom.phone;
    document.getElementById('modal').classList.add('open');
  }

  function closeModal() {
    document.getElementById('modal').classList.remove('open');
  }

  //ADD ROOM 
  function submitRoom() {
    const title = document.getElementById('f-title').value.trim();
    const price = document.getElementById('f-price').value.trim();
    const dist  = document.getElementById('f-dist').value.trim();
    const owner = document.getElementById('f-owner').value.trim();
    const phone = document.getElementById('f-phone').value.trim();

    if (!title || !price || !dist || !owner || !phone) {
      alert('Please fill all required fields!');
      return;
    }

    const amenities = [...document.querySelectorAll('.checkbox-group input:checked')]
      .map(cb => cb.value);

    const newRoom = {
      id: rooms.length + 1,
      title, price: parseInt(price),
      distance: parseFloat(dist),
      type: document.getElementById('f-type').value,
      verified: false, owner, phone,
      amenities: amenities.length ? amenities : ['No amenities listed']
    };

    rooms.push(newRoom);

    // clear form
    ['f-title','f-price','f-dist','f-owner','f-phone','f-desc'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.querySelectorAll('.checkbox-group input').forEach(cb => cb.checked = false);

    showToast('Room listed successfully! 🎉');
    showPage('home');
  }

  // ── PAGE NAVIGATION ──
  function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    window.scrollTo(0, 0);
    if (name === 'home') filterRooms();
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  
  renderRooms(rooms);