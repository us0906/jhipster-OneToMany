package de.kvb.eps.repository;

import de.kvb.eps.domain.Doctor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Doctor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @Query(value = "select distinct doctor from Doctor doctor left join fetch doctor.visitors",
        countQuery = "select count(distinct doctor) from Doctor doctor")
    Page<Doctor> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct doctor from Doctor doctor left join fetch doctor.visitors")
    List<Doctor> findAllWithEagerRelationships();

    @Query("select doctor from Doctor doctor left join fetch doctor.visitors where doctor.id =:id")
    Optional<Doctor> findOneWithEagerRelationships(@Param("id") Long id);
}
