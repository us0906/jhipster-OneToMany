package de.kvb.eps.web.rest;

import de.kvb.eps.domain.Visitor;
import de.kvb.eps.repository.VisitorRepository;
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
 * REST controller for managing {@link de.kvb.eps.domain.Visitor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VisitorResource {

    private final Logger log = LoggerFactory.getLogger(VisitorResource.class);

    private static final String ENTITY_NAME = "visitor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VisitorRepository visitorRepository;

    public VisitorResource(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    /**
     * {@code POST  /visitors} : Create a new visitor.
     *
     * @param visitor the visitor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new visitor, or with status {@code 400 (Bad Request)} if the visitor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/visitors")
    public ResponseEntity<Visitor> createVisitor(@RequestBody Visitor visitor) throws URISyntaxException {
        log.debug("REST request to save Visitor : {}", visitor);
        if (visitor.getId() != null) {
            throw new BadRequestAlertException("A new visitor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Visitor result = visitorRepository.save(visitor);
        return ResponseEntity.created(new URI("/api/visitors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /visitors} : Updates an existing visitor.
     *
     * @param visitor the visitor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated visitor,
     * or with status {@code 400 (Bad Request)} if the visitor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the visitor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/visitors")
    public ResponseEntity<Visitor> updateVisitor(@RequestBody Visitor visitor) throws URISyntaxException {
        log.debug("REST request to update Visitor : {}", visitor);
        if (visitor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Visitor result = visitorRepository.save(visitor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, visitor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /visitors} : get all the visitors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of visitors in body.
     */
    @GetMapping("/visitors")
    public List<Visitor> getAllVisitors() {
        log.debug("REST request to get all Visitors");
        return visitorRepository.findAll();
    }

    /**
     * {@code GET  /visitors/:id} : get the "id" visitor.
     *
     * @param id the id of the visitor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the visitor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/visitors/{id}")
    public ResponseEntity<Visitor> getVisitor(@PathVariable Long id) {
        log.debug("REST request to get Visitor : {}", id);
        Optional<Visitor> visitor = visitorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(visitor);
    }

    /**
     * {@code DELETE  /visitors/:id} : delete the "id" visitor.
     *
     * @param id the id of the visitor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/visitors/{id}")
    public ResponseEntity<Void> deleteVisitor(@PathVariable Long id) {
        log.debug("REST request to delete Visitor : {}", id);
        visitorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
