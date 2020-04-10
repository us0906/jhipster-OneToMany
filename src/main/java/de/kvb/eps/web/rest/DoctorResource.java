package de.kvb.eps.web.rest;

import de.kvb.eps.domain.Doctor;
import de.kvb.eps.repository.DoctorRepository;
import de.kvb.eps.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.kvb.eps.domain.Doctor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DoctorResource {

    private final Logger log = LoggerFactory.getLogger(DoctorResource.class);

    private static final String ENTITY_NAME = "doctor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DoctorRepository doctorRepository;

    public DoctorResource(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    /**
     * {@code POST  /doctors} : Create a new doctor.
     *
     * @param doctor the doctor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new doctor, or with status {@code 400 (Bad Request)} if the doctor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/doctors")
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor) throws URISyntaxException {
        log.debug("REST request to save Doctor : {}", doctor);
        if (doctor.getId() != null) {
            throw new BadRequestAlertException("A new doctor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Doctor result = doctorRepository.save(doctor);
        return ResponseEntity.created(new URI("/api/doctors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /doctors} : Updates an existing doctor.
     *
     * @param doctor the doctor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated doctor,
     * or with status {@code 400 (Bad Request)} if the doctor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the doctor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/doctors")
    public ResponseEntity<Doctor> updateDoctor(@RequestBody Doctor doctor) throws URISyntaxException {
        log.debug("REST request to update Doctor : {}", doctor);
        if (doctor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Doctor result = doctorRepository.save(doctor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, doctor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /doctors} : get all the doctors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of doctors in body.
     */
    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        log.debug("REST request to get all Doctors");
        return doctorRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /doctors/:id} : get the "id" doctor.
     *
     * @param id the id of the doctor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the doctor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/doctors/{id}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable Long id) {
        log.debug("REST request to get Doctor : {}", id);
        Optional<Doctor> doctor = doctorRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(doctor);
    }

    /**
     * {@code DELETE  /doctors/:id} : delete the "id" doctor.
     *
     * @param id the id of the doctor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        log.debug("REST request to delete Doctor : {}", id);
        doctorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
